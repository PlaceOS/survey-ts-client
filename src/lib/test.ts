/**
 * Quick client test of backend endpoints.
 * Run with: npx ts-node ./src/lib/test.
 * Alternatively, you can also test with postman
 */

import { SurveyResponder, SurveysApi } from './api';
import { Configuration } from './configuration';

const basePath = 'https://placeos-dev.aca.im';
//Get from placeos-dev.aca.im and replace
const accessToken =
  'eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJQT1MiLCJpYXQiOjE2NzA1NjQ3MDEsImV4cCI6MTY3MDU3MTkwMSwianRpIjoiZTI1NjRmMGUtNzY1Ni00MjlkLWFjOGItZTY3ZmZkZTlkMzc2IiwiYXVkIjoicGxhY2Vvcy1kZXYuYWNhLmltIiwic2NvcGUiOlsicHVibGljIl0sInN1YiI6InVzZXItQWk3ZVhzZm9UcXZPUzEiLCJ1Ijp7Im4iOiJEZXZlbG9wZXIgIiwiZSI6ImRldkBhY2Fwcm9qZWN0cy5vbm1pY3Jvc29mdC5jb20iLCJwIjoyLCJyIjpbXX19.UIaywWCx2ai6CbDhDPWg6axKxACPBZZawh5EFg3LOMN6yh_A1xFRK4q8nxPj1oxUs4TECCOARtch1WDVxC6eDdaVx_7NSHfJc0kqM_7JC_LT4ICo_MiOEOtTDJEo9r_jGIMSE31ihG5ip9GurKbGXkgcQCog8ZBLVejiG8JbpMIYndVcmo_I3A08HwynAUUX1QdDRhLiBZG8NO6qMsbRc7UY2LWbRturqL4Uk_jCzDUaKlMQIeJ5Z5535CmAI2kHf4wU5s366enR-Ud9UibDQsRBzGY0b_bdSkjpFtBrH__CrR8pv-RlUXE626bWM3DNNOUUP7-4gdakYGPM6OCV4KTDFLkTdLGdiGItGIvaWZTt7c-tSeKZLcpIc1g3dTDCxYJD5e1G_gqIifpiR4XY9tu4Abc8TjTJmAkIJcjk0SBWmRL27y-t_uMusACSpOPhxnAZ-XsSnIVBKOc-vUngiFNbl6d6M6kZ-tDzbrkfxU3J0JU0TPEiMQQ8PJvMAXBZtC-ZkD0KQLld0KI1ZgdVTPmaadJlSd4DjbrOt3oKCnEdG3cq_zRenJrLPwq3IsXwpazU2Z0XXaPzeZKe2JOCjoj836BNYW1ruFFGo9-P9YZLZRwVjLjWz53ZkLOIZ-1Fr7bfYyZq4-KsSLoalnaWHrRRINhQcqI3shJ9rFXChrk';

const ApiConfiguration: Configuration = new Configuration({
  basePath,
  accessToken
});

export class SurveyTest {
  readonly api: SurveysApi;

  constructor() {
    this.api = new SurveysApi(ApiConfiguration);
  }

  async doCreate() {
    const param: SurveyResponder = {
      title: 'Test Survey 3',
      description: 'Testing of survey creation',
      question_order: []
    };

    const res = await this.api
      .surveysCreate(param)
      .then(res => res?.data || null);
    console.log('Response', res);
  }

  async doList() {
    const res = await this.api.surveysIndex().then(res => res?.data || null);
    console.log('Response', res);
  }

  async doPatch() {
    const update: SurveyResponder = {
      description: 'Desc updated'
    };
    const res = await this.api
      .surveysUpdate(1, update)
      .then(res => res?.data || null);
    console.log('Response', res);
  }

  async doDelete() {
    await this.api.surveysDestroy(1).then(
      res => console.log('Response', 'Delete successful'),
      err => console.log('Error deleting', err)
    );
  }
}
const test = new SurveyTest();
//Modify and run as needed
test.doCreate().then(_ => test.doList());
