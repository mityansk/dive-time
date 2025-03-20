export enum CLIENT_ROUTES {
  MAIN = '/',
  TOUR = '/tour',
  LOCATIONS = '/locations',
  EQUIPMENT = '/equipment',
  LOCATIONS_INFO = '/locations/:id',
  PROFILE = '/profile',
  CONFIRM_EMAIL = '/confirm-email/:token',
  RESET_PASSWORD = '/resetPassword/:token',
  NOT_FOUND = '*',
}
