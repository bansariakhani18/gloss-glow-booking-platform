from flask import Blueprint, request, jsonify
import sqlite3

main = Blueprint("main", __name__)

DATABASE_NAME = "gloss_glow.db"


@main.route("/api/services", methods=["GET"])
def get_services():
    conn = sqlite3.connect(DATABASE_NAME)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    cursor.execute("""
        SELECT *
        FROM services
        WHERE is_active = 1
    """)

    services = [dict(row) for row in cursor.fetchall()]

    conn.close()

    return jsonify(services)


@main.route("/api/slots", methods=["GET"])
def get_slots():
    conn = sqlite3.connect(DATABASE_NAME)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    cursor.execute("""
        SELECT *
        FROM slot_settings
        ORDER BY slot_time
    """)

    slots = [dict(row) for row in cursor.fetchall()]

    conn.close()

    return jsonify(slots)


@main.route("/api/gallery", methods=["GET"])
def get_gallery():
    conn = sqlite3.connect(DATABASE_NAME)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    cursor.execute("""
        SELECT *
        FROM gallery_images
        ORDER BY uploaded_at DESC
    """)

    images = [dict(row) for row in cursor.fetchall()]

    conn.close()

    return jsonify(images)


@main.route("/api/appointments", methods=["POST"])
def create_appointment():
    data = request.json

    conn = sqlite3.connect(DATABASE_NAME)
    cursor = conn.cursor()

    # Check slot capacity
    cursor.execute("""
        SELECT max_capacity
        FROM slot_settings
        WHERE slot_time = ?
    """, (data["preferred_time"],))

    slot = cursor.fetchone()

    if not slot:
        conn.close()
        return jsonify({
            "message": "Invalid time slot"
        }), 400

    max_capacity = slot[0]

    cursor.execute("""
        SELECT COUNT(*)
        FROM appointments
        WHERE preferred_date = ?
        AND preferred_time = ?
    """, (
        data["preferred_date"],
        data["preferred_time"]
    ))

    current_bookings = cursor.fetchone()[0]

    if current_bookings >= max_capacity:
        conn.close()
        return jsonify({
            "message": "Selected slot is full"
        }), 400

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


@main.route("/api/admin/appointments", methods=["GET"])
def get_all_appointments():
    conn = sqlite3.connect(DATABASE_NAME)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    cursor.execute("""
        SELECT *
        FROM appointments
        ORDER BY created_at DESC
    """)

    appointments = [dict(row) for row in cursor.fetchall()]

    conn.close()

    return jsonify(appointments)


@main.route("/api/admin/appointments/<int:appointment_id>", methods=["PUT"])
def update_appointment_status(appointment_id):
    data = request.json

    conn = sqlite3.connect(DATABASE_NAME)
    cursor = conn.cursor()

    cursor.execute("""
        UPDATE appointments
        SET status = ?
        WHERE id = ?
    """, (
        data["status"],
        appointment_id
    ))

    conn.commit()

    if cursor.rowcount == 0:
        conn.close()

        return jsonify({
            "message": "Appointment not found"
        }), 404

    conn.close()

    return jsonify({
        "message": "Appointment status updated"
    })

@main.route("/api/admin/services", methods=["GET"])
def get_all_services():
    conn = sqlite3.connect(DATABASE_NAME)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    cursor.execute("""
        SELECT *
        FROM services
        ORDER BY id DESC
    """)

    services = [dict(row) for row in cursor.fetchall()]

    conn.close()

    return jsonify(services)

@main.route("/api/admin/services", methods=["POST"])
def create_service():
    data = request.json

    conn = sqlite3.connect(DATABASE_NAME)
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO services (
            name,
            description,
            price,
            duration
        )
        VALUES (?, ?, ?, ?)
    """, (
        data["name"],
        data.get("description"),
        data.get("price"),
        data.get("duration")
    ))

    conn.commit()

    service_id = cursor.lastrowid

    conn.close()

    return jsonify({
        "message": "Service created successfully",
        "service_id": service_id
    }), 201

@main.route("/api/admin/services/<int:service_id>", methods=["PUT"])
def update_service(service_id):
    data = request.json

    conn = sqlite3.connect(DATABASE_NAME)
    cursor = conn.cursor()

    cursor.execute("""
        UPDATE services
        SET
            name = ?,
            description = ?,
            price = ?,
            duration = ?
        WHERE id = ?
    """, (
        data["name"],
        data.get("description"),
        data.get("price"),
        data.get("duration"),
        service_id
    ))

    conn.commit()

    if cursor.rowcount == 0:
        conn.close()

        return jsonify({
            "message": "Service not found"
        }), 404

    conn.close()

    return jsonify({
        "message": "Service updated successfully"
    })
@main.route("/api/admin/services/<int:service_id>", methods=["DELETE"])
def delete_service(service_id):
    conn = sqlite3.connect(DATABASE_NAME)
    cursor = conn.cursor()

    cursor.execute("""
        DELETE FROM services
        WHERE id = ?
    """, (service_id,))

    conn.commit()

    if cursor.rowcount == 0:
        conn.close()

        return jsonify({
            "message": "Service not found"
        }), 404

    conn.close()

    return jsonify({
        "message": "Service deleted successfully"
    })