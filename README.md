# ACM-AnveshanSetu

Anveshan Setu is a web platform designed to streamline the mentorship process for ACM India’s PhD students. This initiative replaces a manual system, introducing a robust and user-friendly interface to enhance mentorship experiences and foster research collaborations.

## Features and Functionalities

### Student Interface

*   **Registration and Applications:** Students can register, submit applications specifying research interests and preferred mentors, and track application progress.
*   **Profile Management:** Students can create and edit profiles with details like affiliation, year of study, and research preferences.

### Mentor Interface

*   **Application Review:** Mentors can review applications, view student profiles, and provide decisions on mentee selections.
*   **Profile Management:** Mentors can maintain profiles, including areas of expertise and affiliations.

### Admin Panel

*   **Comprehensive Oversight:** Manage applications, view statuses, and handle student and mentor registrations.
*   **Mentor Management:** Add new mentors to the database and update profiles.
*   **Automation:** Streamlined communication with candidates, including automated email updates.

## Technical Implementation

### Frontend

*   Built with **React** for a dynamic and responsive interface.
*   Leveraged **Material-UI (MUI)** for consistent and modern design.

### Backend

*   Developed with **Express.js** to handle API requests and routing.
*   Integrated **MySQL** to manage user data, applications, and statuses effectively.

### Deployment

*   Backend and frontend are deployed as separate services.
*   Production builds are created using `npm run build`.
*   Seamless deployment is supported on **Ubuntu** servers with SQL integration.

---

## Getting Started

**Prerequisites:**

*   Node.js and npm installed
*   MySQL server setup

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Parth0248/ACM-AnveshaanSetu
    cd ACM-AnveshanSetu
    ```

2.  **Install Node.js and NPM (if not already installed):**

    ```bash
    sudo apt update
    sudo apt install nodejs npm
    node -v  # Verify Node.js installation
    npm -v   # Verify npm installation
    ```

3.  **Setup Backend:**

    ```bash
    cd backend
    npm install
    ```

4.  **Setup Frontend:**

    ```bash
    cd frontend
    npm install
    ```

5.  **Setup MySQL Database:**

    *   **Install MySQL (if not already installed):**

        ```bash
        sudo apt install mysql-server
        ```

    *   **Secure the MySQL installation:**

        ```bash
        sudo mysql_secure_installation
        ```

    *   **Login and create a database:**

        ```bash
        sudo mysql -u root -p
        CREATE DATABASE anveshan_setu;
        EXIT;
        ```

    *   **Import schema (replace `path_to_mysql_dump.sql` with your actual path):**

        ```bash
        mysql -u username -p anveshan_setu < path_to_mysql_dump.sql
        ```

6.  **Run the Application:**

    *   **Start Backend:**

        ```bash
        cd backend
        npm run server
        ```

    *   **Start Frontend:**

        ```bash
        cd frontend
        npm start
        ```

7.  **Production Build and Deployment:**

    *   **Build Frontend:**

        ```bash
        cd frontend
        npm run build
        ```

    *   Deploy the production build on your web server.

## Contributing

*   Fork the repository.
*   Create a new branch for your feature.
*   Commit your changes.
*   Submit a pull request.

## License

This project is licensed under the MIT License.

## Contact

For questions or support, contact the ACM India team at events.acm.org.
