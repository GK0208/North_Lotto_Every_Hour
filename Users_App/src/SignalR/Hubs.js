import * as signalR from '@aspnet/signalr';

export const connection = new signalR.HubConnectionBuilder()
 .withUrl("http://localhost:5000/withdrawDone",{
     skipNegotiation: true,
     transport: signalR.HttpTransportType.WebSockets
   })
 .configureLogging(signalR.LogLevel.Information)
 .build();



