/*
 Navicat Premium Data Transfer

 Source Server         : Localhost
 Source Server Type    : MySQL
 Source Server Version : 50717
 Source Host           : localhost
 Source Database       : cAuth

 Target Server Type    : MySQL
 Target Server Version : 50717
 File Encoding         : utf-8

 Date: 08/10/2017 22:22:52 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `cSessionInfo`
-- ----------------------------
DROP TABLE IF EXISTS `new1`;
CREATE TABLE `new1` (
  `category` varchar(255) COLLATE utf8_general_ci,
  `link` varchar(255) COLLATE utf8_general_ci,
  `name` varchar(255) COLLATE utf8_general_ci,
  `eventWebsite` varchar(255) COLLATE utf8_general_ci,
  `eventDescription` text COLLATE utf8_general_ci,
  `eventOrganiser` varchar(255) COLLATE utf8_general_ci,
  `parent` varchar(255) COLLATE utf8_general_ci,
  `eventCountry` varchar(255) COLLATE utf8_general_ci,
  `contactPerson` varchar(255) COLLATE utf8_general_ci,
  `eventStart` date,
  `eventEnd` date,
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8_general_ci COMMENT='会议信息';

SET FOREIGN_KEY_CHECKS = 1;
