import { Injectable } from '@nestjs/common';

@Injectable()
export class GroupEnrollmentKey {
  generateEnrollmentKey() {
    const enrollmentKey = Math.random().toString(36).substring(2);

    // const enrollmentKeyExpiration = new Date();

    // enrollmentKeyExpiration.setMinutes(
    //   enrollmentKeyExpiration.getMinutes() + 20,
    // );

    return {
      enrollmentKey,
      // enrollmentKeyExpiration,
    };
  }
}
