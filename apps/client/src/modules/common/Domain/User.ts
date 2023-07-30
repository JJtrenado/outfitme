export interface User {
	email: string;
	name: string;
  picture: string;
	jwt: string;
}

export interface EndpointUser {
  id: string;
  email: string;
  verified_email: boolean,
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}