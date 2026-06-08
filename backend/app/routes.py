from flask import Blueprint, request, jsonify
import sqlite3

main = Blueprint("main", __name__)

DATABASE_NAME = "gloss_glow.db"


@main.route("/appointments", methods=["POST"])
def create_appointment():
    data = request.json

    conn = sqlite3.connect(DATABASE_NAME)
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO appointments (
            customer_name,
            customer_phone,
            customer_email,
            service_type,
            preferred_date,
            preferred_time,
            vehicle_make,
            vehicle_model,
            notes
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        data["customer_name"],
        data["customer_phone"],
        data.get("customer_email"),
        data["service_type"],
        data["preferred_date"],
        data["preferred_time"],
        data.get("vehicle_make"),
        data.get("vehicle_model"),
        data.get("notes")
    ))

    conn.commit()
    conn.close()

    return jsonify({
        "message": "Appointment booked successfully"
    }), 201