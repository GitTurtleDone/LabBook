// gql template literal tag - parses GraphQL query string into a structured document object
import { gql } from "@apollo/client";

export const GET_EQUIPMENT_LIST = gql`
  query GetEquipment {
    equipmentList {
      id
      name
      category
      description
      status
      connectingStr
      model
      manufacturer
      serialNumber
      purchaseYear
      calibrationDue
      location
      requiresTraining
      imageUrl
      videoUrl
      documentationUrl
      notes
    }
  }
`;
export const GET_BOOKINGS_FOR_USER = gql`
  query GetBookingsForUser($userId: ID!) {
    bookingsByUser(userId: $userId) {
      id
      startTime
      endTime
      purpose
      status
      equipment {
        id
        name
      }
      user {
        id
      }
    }
  }
`;
export const GET_BOOKINGS_FOR_EQUIPMENT = gql`
  query GetBookingsForEquipment($equipmentId: ID!) {
    bookingsByEquipment(equipmentId: $equipmentId) {
      id
      startTime
      endTime
      purpose
      status
      user {
        id
        email
        firstName
        lastName
        department
        role
      }
      equipment {
      id
      }
    }
  }
`;

export const GET_USERS = gql`
  query GetUsers {
    usersList {
      id
      email
      firstName
      lastName
      department
      role
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($user: UserInput!) {
    createUser(userInput: $user) {
      id
      email
      firstName
      lastName
      department
      lastLoginAt
    }
  }
`;

export const CREATE_EQUIPMENT = gql`
  mutation CreateEquipment($equipment: EquipmentInput!) {
    createEquipment(equipmentInput: $equipment) {
      id
      name
      category
      description
      status
      connectingStr
      model
      manufacturer
      serialNumber
      purchaseYear
      calibrationDue
      location
      requiresTraining
      imageUrl
      videoUrl
      documentationUrl
      notes
    }
  }
`;
export const CREATE_BOOKING = gql`
  mutation CreateBooking($bookingInput: BookingInput!) {
    createBooking(bookingInput: $bookingInput) {
      id
      startTime
      endTime
      purpose
      status
      equipment {
        id
        name
      }
      user {
        id
        email
        firstName
        lastName
        department
        role
      }
    }
  }
`;

export const CANCEL_BOOKING = gql`
  mutation CancelBooking($id: ID!) {
    cancelBooking(id: $id) {
      id
      status
    }
  }
`;
