/**
 * @typedef {Object} User
 * @property {Date} createdAt
 * @property {Date} updatedAt
 * @property {string} email
 * @property {string} profileImage
 * @property {string} token
 */

import { Model, Sequelize } from "sequelize";

/**
 * @typedef {Object} Trip
 * @property {Date} createdAt
 * @property {Date} updatedAt
 * @property {string} launchId
 * @property {string} userId
 */

/**
 * @typedef {Object} Store
 * @property {Sequelize} db
 * @property {Model} users
 * @property {Model} trips
 */
