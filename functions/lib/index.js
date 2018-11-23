"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const firebase = admin.initializeApp(functions.config().firebase);
//View all orders
exports.getOrder = functions.https.onRequest((req, res) => {
    var orderRef = firebase.database().ref('/orders');
    return orderRef.once('value').then(function (snap) {
        res.status(200).json({ orders: snap.val() });
    });
});
//view order by id
exports.getOrderById = functions.https.onRequest((req, res) => {
    let key = req.query.key;
    var orderRef = firebase.database().ref('/orders').child(key);
    return orderRef.once('value').then(function (snap) {
        res.status(200).json({ order: snap.val() });
    });
});
exports.createOrder = functions.https.onRequest((req, res) => {
    let orderRef = firebase.database().ref('/orders');
    return orderRef.push(req.body).then(function (snap) {
        res.status(200).send('order created');
    });
});
exports.updateOrder = functions.https.onRequest((req, res) => {
    let key = req.query.key;
    let orderRef = firebase.database().ref('/orders').child(key);
    return orderRef.update(req.body).then(function (snap) {
        res.status(200).send('order updated');
    });
});
exports.deleteOrder = functions.https.onRequest((req, res) => {
    let key = req.query.key;
    let orderRef = firebase.database().ref('/orders').child(key);
    return orderRef.remove().then(function (snap) {
        res.status(200).send('order deleted');
    });
});
//# sourceMappingURL=index.js.map