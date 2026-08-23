const express = require("express");
const router = express.Router();

const db = require("../config/db");


// ========================================
// PLACE ORDER
// ========================================

router.post("/", (req, res) => {

    const { user_id, items } = req.body;

    if (!user_id) {
        return res.status(400).json({
            message: "User ID is required"
        });
    }

    if (!items || items.length === 0) {
        return res.status(400).json({
            message: "Cart is empty"
        });
    }

    let totalAmount = 0;

    items.forEach(item => {
        totalAmount +=
            Number(item.price) * Number(item.quantity);
    });


    const orderSql = `
        INSERT INTO orders
        (user_id, total_amount, status)
        VALUES (?, ?, 'Pending')
    `;


    db.query(
        orderSql,
        [user_id, totalAmount],
        (err, orderResult) => {

            if (err) {
                console.error(err);

                return res.status(500).json({
                    message: "Failed to create order"
                });
            }


            const orderId = orderResult.insertId;


            const itemValues = items.map(item => [
                orderId,
                item.product_id,
                item.quantity,
                item.price
            ]);


            const itemSql = `
                INSERT INTO order_items
                (order_id, product_id, quantity, price)
                VALUES ?
            `;


            db.query(
                itemSql,
                [itemValues],
                (err) => {

                    if (err) {
                        console.error(err);

                        return res.status(500).json({
                            message: "Failed to save order items"
                        });
                    }


                    res.status(201).json({
                        message: "Order placed successfully",
                        orderId: orderId,
                        totalAmount: totalAmount
                    });
                }
            );
        }
    );
});


// ========================================
// GET USER ORDERS WITH PRODUCTS
// ========================================

router.get("/user/:userId", (req, res) => {

    const userId = req.params.userId;


    const sql = `
        SELECT
            o.id AS order_id,
            o.total_amount,
            o.status,
            o.created_at,

            oi.product_id,
            oi.quantity,
            oi.price,

            p.name AS product_name,
            p.image

        FROM orders o

        JOIN order_items oi
            ON o.id = oi.order_id

        JOIN products p
            ON oi.product_id = p.id

        WHERE o.user_id = ?

        ORDER BY o.created_at DESC
    `;


    db.query(
        sql,
        [userId],
        (err, results) => {

            if (err) {

                console.error(err);

                return res.status(500).json({
                    message: "Failed to fetch orders"
                });
            }


            res.json(results);
        }
    );
});


module.exports = router;