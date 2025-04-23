#### **Mountain Valley App**

![App Preview](screenshots/screenshot-2.png)  
_Custom-built application to manage everything about the hotel: bookings, cabins, and guests._

A custom-built application designed to manage all aspects of hotel operations, including booking, cabins, and guests. This internal management tool is built using modern web technologies and integrates seamlessly with the customer-facing website.

---

### **Table of Contents**

-   [Overview](#overview)
-   [Features](#features)
-   [Project Requirements](#project-requirements)
-   [Technology Stack](#technology-stack)
-   [Screenshots](#screenshots)
-   [Links](#links)

---

### **Overview**

The **Mountain Valley App** is an internal management application for hotel employees. It provides a comprehensive dashboard and tools to manage bookings, cabins, and guest information efficiently. The app is built on React and uses Supabase for its backend and database, ensuring seamless integration with the customer-facing website.

---

### **Features**

-   **User Management**: Only hotel employees can sign up and log in to perform tasks.
-   **Cabin Management**: View, update, delete, and create cabins with detailed information such as photos, capacity, price, and discounts.
-   **Booking Management**: Manage bookings with status tracking ("unconfirmed," "checked in," "checked out"), filterable by status, and payment confirmation.
-   **Guest Data**: Maintain detailed guest profiles, including full name, email, national ID, nationality, and country flag.
-   **Dashboard**: Display important statistics for the last 7, 30, or 90 days, including check-ins, check-outs, bookings, sales, and occupancy rates.
-   **Settings**: Configure application-wide settings like breakfast price, minimum/maximum nights per booking, and maximum guests per booking.
-   **Dark Mode**: A user-friendly dark mode for better visibility.

---

### **Project Requirements**

1. **Users**:

    - Users of the app are hotel employees who must be logged in to perform tasks.
    - New users can only be signed up inside the application to ensure only actual hotel employees have accounts.

2. **Profile Management**:

    - Users should be able to upload an avatar and change their name and password.

3. **Cabin Management**:

    - The app needs a table view showing all cabins with details like cabin photo, name, capacity, price, and current discount.
    - Users should be able to update or delete a cabin and create new cabins (including uploading a photo).

4. **Booking Management**:

    - The app needs a table view showing all bookings with arrival and departure dates, status, paid amount, cabin data, and guest data.
    - Booking statuses include "unconfirmed," "checked in," and "checked out." The table should be filterable by status.
    - Other booking data includes: number of guests, number of nights, guest observations, breakfast booking, and breakfast price.
    - Users should be able to delete, check in, or check out a booking as the guest arrives.
    - Bookings may not have been paid yet on guest arrival. On check-in, users need to accept payment (outside the app) and then confirm payment received (inside the app).
    - Guests should have the ability to add breakfast for the entire stay during check-in if they hadn't already booked it.

5. **Dashboard**:

    - Display a list of guests checking in and out on the current day.
    - Show statistics on recent bookings, sales, check-ins, and occupancy rates.
    - Include charts for daily hotel sales (total and extras) and stay durations.

6. **Settings**:

    - Allow users to define application-wide settings such as breakfast price, minimum/maximum nights per booking, and maximum guests per booking.

7. **Dark Mode**:
    - Implement a dark mode for better usability.

---

### **Technology Stack**

-   **Frontend**:

    -   Framework: React
    -   Routing: React Router 6
    -   Styling: Styled Components
    -   Remote State Management: React Query
    -   UI State Management: Context API
    -   Form Management: React Hook Form
    -   Other Tools:
        -   React Icons
        -   React Query Devtools
        -   Pagination with React Query
        -   Pre-Fetching with React Query
        -   React Hot Toast
        -   Date Fns
        -   prop-types
        -   React Portal
        -   Compound Components Pattern
        -   Render Props Pattern
        -   Custom Hooks
        -   Dark Mode
        -   Recharts Library (for charts)
        -   React Error Boundary (with react-error-boundary library)

-   **Backend & Database**:
    -   Built using Supabase (API and Database)

---

### **Screenshots**

![Screenshot 1](screenshots/screenshot-1.png)
![Screenshot 2](screenshots/screenshot-2.png)
![Screenshot 3](screenshots/screenshot-3.png)
![Screenshot 4](screenshots/screenshot-4.png)
![Screenshot 5](screenshots/screenshot-5.png)
![Screenshot 6](screenshots/screenshot-6.png)
![Screenshot 7](screenshots/screenshot-7.png)
![Screenshot 8](screenshots/screenshot-8.png)
![Screenshot 9](screenshots/screenshot-9.png)
![Screenshot 10](screenshots/screenshot-10.png)
![Screenshot 11](screenshots/screenshot-11.png)

---

### **Links**

-   **GitHub Repository**: [Mountain Valley App](https://github.com/romanzollo/mountain-valley-app)
-   **Related Project**: [Mountain Valley Website](https://github.com/romanzollo/mountain-valley-website) – The customer-facing website that shares the same Supabase database and API.

---

### **Contact**

If you have any questions or feedback, feel free to reach out!

---

### **License**

This project is licensed under the MIT License.

---
