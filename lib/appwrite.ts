import { Client, Account } from 'appwrite';

const client = new Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject("6878e1930000fb0009b5");

export const account = new Account(client);
