// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const environment = {
  production: false,
  apiBaseUrl: 'http://127.0.0.1:3000/api/v1',
  storyBaseUrl :"http://127.0.0.1:9000/mini-facebook/",
  profileBaseUrl :"http://127.0.0.1:3000/api/v1",
  // userService: "http://userservice:3001",
  // statusService: "http://statusservice:3002",
  // storyService: "http://storyservice:3003",
  imgExt:".png",
  fbLogo:"https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg",
  registrationError:422,
  serverError:'Opps!! Server not Responding. Please Try Again',


};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
