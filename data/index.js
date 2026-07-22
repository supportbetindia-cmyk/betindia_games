import home from "./home";
import casino from "./casino";
import sports from "./sports";
import cricket from "./cricket";
import football from "./football";
import tennis from "./tennis";
import slots from "./slots";
import TableGames from "./tablegames";
import Promotions from "./promotions";
import AboutUs from "./AboutUs";
import ResponsibleGaming from "./responsible-gaming";
import ContactUs from "./ContactUs";
import PrivacyPolicy from "./privacy-policy";
import TermsAndConditions from "./terms-and-conditions";
import VIPBenefits from "./VIPBenefits";
import live from "./live";
import badminton from "./badminton";
import volleyball from "./volleyball";
import kabaddi from "./kabaddi";
import blog from "./blog";
import esports from "./esports";
import andarBahar from "./andar-bahar";
import aviator from "./aviator";
import teenPatti from "./teen-patti";
import liveCasino from "./live-casino";

/**
 * Registry of all CMS page defaults.
 *
 * To add a new editable page: create data/<page>.js (exporting the same default
 * shape — `{ pageId, name, slug, sections }`) and import it here. syncCMS() will
 * then seed it automatically.
 *
 * @type {Array<{
 *   pageId: string,
 *   name: string,
 *   slug: string,
 *   sections: Record<string, Record<string, any>>
 * }>}
 */
export const CMS_DATA = [
  home,
  casino,
  sports,
  cricket,
  football,
  tennis,
  slots,
  TableGames,
  Promotions,
  AboutUs,
  ResponsibleGaming,
  ContactUs,
  PrivacyPolicy,
  TermsAndConditions,
  VIPBenefits,
  live,
  badminton,
  volleyball,
  kabaddi,
  blog,
  esports,
  andarBahar,
  aviator,
  teenPatti,
  liveCasino,
];