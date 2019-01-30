/*
Navicat MySQL Data Transfer

Source Server         : node
Source Server Version : 50723
Source Host           : localhost:3306
Source Database       : nodetest

Target Server Type    : MYSQL
Target Server Version : 50723
File Encoding         : 65001

Date: 2019-01-30 09:52:37
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `userInfoId` int(11) NOT NULL,
  `userName` varchar(11) DEFAULT NULL,
  `sex` varchar(11) DEFAULT NULL,
  `age` varchar(11) DEFAULT NULL,
  `phoneNumber` varchar(125) DEFAULT NULL,
  `createTime` varchar(225) DEFAULT NULL,
  `updateTime` varchar(225) DEFAULT NULL,
  PRIMARY KEY (`userInfoId`),
  UNIQUE KEY `phoneNumber` (`phoneNumber`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
