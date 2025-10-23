export default {
  // eventby
  admin: "admin",
  namePatternCheckEventBy: /^[a-zA-Z ,.'-]+$/i,
  contactNumberPatternCheckEventBy:
    /^\+?\d{1,3}[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,4}[-.\s]?/,
  namePatternCheckEventBy1: /^[a-zA-Z0-9\s]*$/,
  englishRegexCheckEventBy: /[a-zA-Z0-9]/, // Updated regex to include the whole string
  specialCharRegexCheckEventBy: /^[a-zA-Z0-9\s .,'_-]*$/,
  // namePatternCheckEventBy: /^[a-zA-Z]+$/,

  namePatternCheckEventBy2: /^[0-9]+$/,

  emailPatternCheckEventBy:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  // passwordPatternCheckEventBy: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&+=!*?,]).*$/g,
  // passwordPatternCheckEventBy: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!*?,]).*$/g,
  // passwordPatternCheckEventBy:
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!*?,]).{8,}$/,
  passwordPatternCheckEventBy:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!*?,!\"#$%&'()*+,\-.\/:;<=>?@[\\\]^_\\{|}~]).{8,}$/,

  localStorageCustomNameEventBy: "eventby_user_db_manager_",
  // eventby

  // phonePattern:
  //   /^\+?\d{1,3}[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,

  api: {
    // api under user
    signUp: "/api/v1/auth/signup",
    signIn: "/api/v1/auth/signin",
    logoutUser: "/user/logout",

    getDashboardStatsData: "/event/get-dashboard-data",
    getDashboardUpcommingEvents: "/event/get-dashboard-upcoming-events",
    getDashboardGraphData: "/event/get-dashboard-graph-data",

  },

  fileSizeInMbForConversion: 1048576,
  maximumSizeForSponsorImageFile: 2,
  profileImageMaxSizeInBytes: 2 * 1000 * 1000, //max 2 mb for profile image
  bannerImageMaxSizeInBytes: 5 * 1000 * 1000, //max 5 mb for banner image
  assetVideosMaxSizeInBytes: 10 * 1000 * 1000, //max 10 mb for banner image
  commentImageMaxSizeInBytes: 1 * 1000 * 1000, //max 1 mb for comment image

  inputMaxCharactersLength: {
    createEventName: 100,
    createEventSummary: 150,

    createEventAddressLine1: 150,
    createEventAddressLine2: 150,
    createEventCountry: 100,
    createEventCity: 100,
    createEventState: 100,
    createEventPostalCode: 100,

    createEventPlatformLink: 100,

    createEventPhotosAndVideosDescription: 5000,
    createEventPhotosAndVideosDescriptionShow: 5011,
    // manageEventPhotosAndVideosDescription: 5000,

    addEventCoOrganizersName: 100,
    addEventCoOrganizersEmail: 100,

    addEventSpeakersName: 100,
    addEventSpeakersEmail: 100,

    addEventSponsorsName: 100,
    addEventSponsorsWebSiteLink: 100,
    eventTicketName: 30,
    myEventsSearchEvent: 100,
  },
  maximumLengthOfDisplayNameAndOthersFieldInShort: 20,
  REQUIRED_MESSAGE: "This is required.",
  REQUIRED_MESSAGElink: "Invalid link. Please provide a valid link.",
  VALIDATION_MESSAGE_EVENT_NAME_MINIMUM:
    "Too short! Minimum is 5 characters long.",
  VALIDATION_MESSAGE_EVENT_SUMMARY_MINIMUM:
    "Too short! Minimum is 10 characters long.",
  ALERT_MESSAGE_EVENT_INFO_UPDATE_SUCCESS: "Updated successfully",
  ALERT_MESSAGE_DATA_DELETE_SUCCESS: "Deleted successfully",
  VALIDATION_MESSAGE_MESSAGE_START_DATE_CAN_NOT_GREATER_TO_END_DATE:
    "Start date must be greater than end date",

  VALIDATION_MESSAGE_MESSAGE_START_DATE_AND_END_DATE_CAN_NOT_EMPTY:
    "Start date or end date can not be empty",

  emailCountdownSeconds: 60,

  // PASSWORDS_8_CHARACTERS:
  //   "Please use 8 or more characters with a capital and small letters, numbers & symbols",

  SOCIAL_MEDIA_AUTHENTICATION_SUCCESS_WAIT_TIME: 3000,
  INITIAL_PAGE_NUMBER: 0,
  LIMIT_PER_PAGE: 5,

  staticPageNameForLanguage: {
    dashboard_event_create_page_one: "dashboard_event_create_page_one",
  },
};


