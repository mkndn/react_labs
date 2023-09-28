import gql from "graphql-tag";

const typeDefs = gql`
  "Defines the properties of the rocket launch"
  type Launch {
    id: ID!
    launchPad: LaunchPad
    name: String!
    links: Links
    rocket: Rocket
    booked: Boolean!
  }

  type Links {
    patch: Patch
  }

  type Patch {
    small: String
    large: String
  }

  type LaunchPad {
    id: ID!
    locality: String
    region: String!
  }

  "Defines the properties of the rocket"
  type Rocket {
    id: ID!
    name: String
    type: String
  }

  "Defines the properties for a user"
  type User {
    id: ID!
    email: String!
    trips: [Launch]!
    token: String
  }

  type Query {
    "Fetch list of all launches"
    launches: [Launch]!

    "Fetch a single launch by it's ID"
    launch(id: ID!): Launch

    "Get currently logged in user details"
    me: User
  }

  type Mutation {
    bookTrips(launchIds: [ID!]!): TripBookResponse!
    cancelTrip(launchId: ID!): TripBookResponse!
    login(email: String!): User!
  }

  "Defines response content when a user books a trip"
  type TripBookResponse {
    code: Int!
    message: String!
    succcess: Boolean!
    launches: [Launch]
  }
`;

export default typeDefs;
