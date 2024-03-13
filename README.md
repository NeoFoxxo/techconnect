# TechConnect

TechConnect is a tech support platform that utilises matchmaking algorithm to pair a client with the technician best suited to
solve their issue.

## Features

- ⚙️ Custom algorithm to ensure the client receives the best technician
- 📱 Real-time text chat using SignalR, allowing communication between clients and technicians.
- 🔐 Secure authentication with cookies and password encryption
- 📝 Clients can create a support request to be paired with a technician proficient in the required skills
- 🛠️ Technicians can view tickets and interact with clients
- 👩‍💼 Managers can create new technicians, add new skills, and modify technicians
- 🔒 Role-based access control to secure endpoints
- 🎨 Modern corporate design

## How To Run It

To run this on your local machine, you will need to have the <strong>latest LTS version</strong> of Node.js, .NET 8 installed, and access to a SQLServer database.

1. Clone the repository to your local machine
2. Restore the `techconnect.bak` file to your SQLServer database
3. Open the `backend` folder
4. Change the database details in`appsettings.json` to your database
5. Run `dotnet restore` and `dotnet run  --launch-profile https`
6. Open the `frontend` folder
7. Open your terminal and run `npm install` and `npm run build`
8. Then run the `npm run start` command
9. Access the app on port 4173 and enjoy!

## Website Images

<table>
  <img src="https://github.com/NeoFoxxo/techconnect/blob/main/images/tech-current-ticket.png" alt="current ticket page" width="100%">
  <img src="https://github.com/NeoFoxxo/techconnect/blob/main/images/createsupportrequest.png" alt="create support request form" width="100%">
  <tr>
    <td><img src="https://github.com/NeoFoxxo/techconnect/blob/main/images/technicians.png" alt="manager viewing technicians" width="100%"></td>
    <td><img src="https://github.com/NeoFoxxo/techconnect/blob/main/images/tech-details.png" alt="manager editing technician" width="110%"></td>
  </tr>
  <tr>
    <td><img src="https://github.com/NeoFoxxo/techconnect/blob/main/images/tech-login.png" alt="technician login" width="100%"></td>
    <td><img src="https://github.com/NeoFoxxo/techconnect/blob/main/images/tech-tickets.png" alt="technician viewing tickets" width="100%"></td>
  </tr>
</table>
