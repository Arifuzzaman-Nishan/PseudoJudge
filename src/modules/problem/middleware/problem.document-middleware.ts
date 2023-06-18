import { ProblemDetailsRepository } from '../repository/problem-details.repository';

export function deleteRelatedProblemDetails(
  problemDetailsRepository: ProblemDetailsRepository,
) {
  return async function (next) {
    // console.log('from mongoose middleware', this.getQuery());
    const problem = await this.model.findOne(this.getQuery());
    // console.log('problem is ', problem);
    try {
      if (problem) {
        await problemDetailsRepository.delete({
          _id: problem.problemDetails,
        });
        next();
      }
    } catch (err: any) {
      console.log('Error in deleteRelatedProblemDetails', err.message);
      next(err);
    }
  };
}
