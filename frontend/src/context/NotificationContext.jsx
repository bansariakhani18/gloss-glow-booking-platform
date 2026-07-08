import { createContext, useContext, useState, useCallback } from "react";
const NotificationContext = createContext(null);
export function NotificationProvider({ children }) {
    const [notifications, setNotifications] = useState([]);
    const [highlightedAppointmentId, setHighlightedAppointmentId] = useState(null);
    const addNotifications = useCallback((newAppointments) => {
        const items = newAppointments.map((appointment) => ({
            id: appointment.id,
            customer_name: appointment.customer_name,
            service_type: appointment.service_type,
            preferred_date: appointment.preferred_date,
            preferred_time: appointment.preferred_time,
            created_at: new Date().toISOString(),
            read: false,
        }));
        setNotifications((prev) => [...items, ...prev]);
    }, []);
    function markAsRead(id) {
        setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, read: true } : n))
        );
    }
    function markAllAsRead() {
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    }
    function clearAll() {
        setNotifications([]);
    }
    function highlightAppointment(id) {
        setHighlightedAppointmentId(id);
        markAsRead(id);
        setTimeout(() => {
            setHighlightedAppointmentId((current) =>
                current === id ? null : current
            );
        }, 6000);
    }
    const unreadCount = notifications.filter((n) => !n.read).length;
    return (
        <NotificationContext.Provider
            value={{
                notifications,
                unreadCount,
                addNotifications,
                markAsRead,
                markAllAsRead,
                clearAll,
                highlightedAppointmentId,
                highlightAppointment,
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
}
export function useNotifications() {
    const ctx = useContext(NotificationContext);
    if (!ctx) {
        throw new Error(
            "useNotifications must be used within a NotificationProvider"
        );
    }
    return ctx;
}
