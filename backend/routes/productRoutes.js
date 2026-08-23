const express = require("express");
const router = express.Router();

const db = require("../config/db");

// GET all products
router.get("/", (req, res) => {

    const sql = "SELECT * FROM products";

    db.query(sql, (err, results) => {

        if (err) {
            return res.status(500).json({
                message: "Failed to fetch products"
            });
        }

        res.json(results);
    });
});


// POST - Add new product
router.post("/", (req, res) => {

    const { name, description, price, image, category, stock } = req.body;

    const sql = `
        INSERT INTO products
        (name, description, price, image, category, stock)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [name, description, price, image, category, stock],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: "Failed to add product"
                });
            }

            res.status(201).json({
                message: "Product added successfully",
                productId: result.insertId
            });
        }
    );
});


// PUT - Update product
router.put("/:id", (req, res) => {

    const { id } = req.params;
    const { name, description, price, image, category, stock } = req.body;

    const sql = `
        UPDATE products
        SET name = ?, description = ?, price = ?, image = ?, category = ?, stock = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [name, description, price, image, category, stock, id],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: "Failed to update product"
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "Product not found"
                });
            }

            res.json({
                message: "Product updated successfully"
            });
        }
    );
});


// DELETE - Delete product
router.delete("/:id", (req, res) => {

    const { id } = req.params;

    const sql = "DELETE FROM products WHERE id = ?";

    db.query(sql, [id], (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Failed to delete product"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json({
            message: "Product deleted successfully"
        });
    });
});


module.exports = router;