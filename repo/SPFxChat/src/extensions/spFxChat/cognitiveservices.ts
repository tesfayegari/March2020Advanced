import { ApplicationCustomizerContext } from "@microsoft/sp-application-base";
import { HttpClient, IHttpClientOptions } from "@microsoft/sp-http";

export class CognitiveService {
  //Please make sure to copy and use your own subscription and knowledge base ID 
  private qnamakerSubscriptionKey: string = "Your Subscription"; //GUID
  private knowledgebaseId: string = "Your Knowledge ID"; //GUID

  constructor(private context: ApplicationCustomizerContext) { }

  public async getQnaAnswer(userQuery: string): Promise<string> {
    let answer: string = 'Could not find the answer to your question... sorry!';
    //Replace your congnitive service
    const postURL = `https://yourCogService.azurewebsites.net/qnamaker/knowledgebases/${this.knowledgebaseId}/generateAnswer`;

    // Build body
    const body: string = JSON.stringify({
      'question': userQuery
    });

    // Build headers
    const requestHeaders: Headers = new Headers();
    requestHeaders.append('Content-type', 'application/json');
    requestHeaders.append('Authorization', `EndpointKey  ${this.qnamakerSubscriptionKey}`);


    const httpClientOptions: IHttpClientOptions = {
      body: body,
      headers: requestHeaders
    };

    let response = await this.context.httpClient.post(
      postURL,
      HttpClient.configurations.v1,
      httpClientOptions
    );

    if (response.ok) {
      let json = await response.json();
      console.log('Answer for question ' + userQuery, json);
      if (json.answers[0].answer != 'No good match found in the KB')
        answer = json.answers[0].answer
    }

    return answer;

  }

}