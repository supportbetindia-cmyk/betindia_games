import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAnalytics, type Analytics } from "firebase/analytics";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getAuth, type Auth } from "firebase/auth";
import { getStorage, type FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

/** True when the minimum env vars needed to talk to Firebase are present. */
export function isFirebaseConfigured(): boolean {
  const { apiKey, projectId } = firebaseConfig;
  return Boolean(
    typeof apiKey === "string" &&
      apiKey.trim().length > 0 &&
      typeof projectId === "string" &&
      projectId.trim().length > 0
  );
}

let appInstance: FirebaseApp | null | undefined;
let dbInstance: Firestore | null | undefined;
let authInstance: Auth | null | undefined;
let storageInstance: FirebaseStorage | null | undefined;

function getAppInstance(): FirebaseApp | null {
  if (appInstance !== undefined) return appInstance;
  if (!isFirebaseConfigured()) {
    appInstance = null;
    return appInstance;
  }
  try {
    appInstance = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  } catch (err) {
    console.error("Firebase app init failed:", err);
    appInstance = null;
  }
  return appInstance;
}

function getDbInstance(): Firestore | null {
  if (dbInstance !== undefined) return dbInstance;
  const app = getAppInstance();
  if (!app) {
    dbInstance = null;
    return dbInstance;
  }
  try {
    dbInstance = getFirestore(app);
  } catch (err) {
    console.error("Firestore init failed:", err);
    dbInstance = null;
  }
  return dbInstance;
}

function getAuthInstance(): Auth | null {
  if (authInstance !== undefined) return authInstance;
  const app = getAppInstance();
  if (!app) {
    authInstance = null;
    return authInstance;
  }
  try {
    authInstance = getAuth(app);
  } catch (err) {
    console.error("Firebase Auth init failed:", err);
    authInstance = null;
  }
  return authInstance;
}

function getStorageInstance(): FirebaseStorage | null {
  if (storageInstance !== undefined) return storageInstance;
  const app = getAppInstance();
  if (!app) {
    storageInstance = null;
    return storageInstance;
  }
  try {
    storageInstance = getStorage(app);
  } catch (err) {
    console.error("Firebase Storage init failed:", err);
    storageInstance = null;
  }
  return storageInstance;
}

/** @deprecated Prefer getDb() — kept for existing imports. */
export const app = getAppInstance();

export function getDb(): Firestore {
  const instance = getDbInstance();
  if (!instance) {
    throw new Error("Firestore is not available — check Firebase env configuration.");
  }
  return instance;
}

export function getFirebaseAuth(): Auth {
  const instance = getAuthInstance();
  if (!instance) {
    throw new Error("Firebase Auth is not available — check Firebase env configuration.");
  }
  return instance;
}

export function getFirebaseStorage(): FirebaseStorage {
  const instance = getStorageInstance();
  if (!instance) {
    throw new Error("Firebase Storage is not available — check Firebase env configuration.");
  }
  return instance;
}

/**
 * Real Firestore instance (or null, cast to Firestore, when env isn't
 * configured). This must NOT be a Proxy: the Firestore SDK's collection()/doc()
 * validate the argument with an internal brand check that a Proxy fails with
 * "Expected first argument to collection() to be ... FirebaseFirestore".
 * getDbInstance() is memoized, so this initializes Firestore at most once.
 */
export const db = getDbInstance() as Firestore;

/** Lazy proxy — safe to import during static build / sitemap generation. */
export const auth = new Proxy({} as Auth, {
  get(_target, prop, receiver) {
    const instance = getAuthInstance();
    if (!instance) return undefined;
    const value = Reflect.get(instance as object, prop, receiver);
    return typeof value === "function" ? value.bind(instance) : value;
  },
});

export const storage = new Proxy({} as FirebaseStorage, {
  get(_target, prop, receiver) {
    const instance = getStorageInstance();
    if (!instance) return undefined;
    const value = Reflect.get(instance as object, prop, receiver);
    return typeof value === "function" ? value.bind(instance) : value;
  },
});

export const analytics: Analytics | null = (() => {
  if (typeof window === "undefined") return null;
  try {
    const app = getAppInstance();
    return app ? getAnalytics(app) : null;
  } catch {
    return null;
  }
})();
