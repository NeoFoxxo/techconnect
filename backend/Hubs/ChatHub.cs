using Microsoft.AspNetCore.SignalR;
using techconnect.Models;

namespace techconnect.Hubs
{
    public class ChatHub : Hub
    {
        public async Task JoinChat(UserConnection conn)
        {
            await Groups
                .AddToGroupAsync(Context.ConnectionId, "Ticket" + conn.TicketId);
            await Clients.Group("Ticket" + conn.TicketId)
                .SendAsync("JoinChat", $"{conn.Name} has joined {"Ticket" + conn.TicketId}");
        }
        
        public async Task SendMessage(UserConnection conn, string message)
        {
            await Clients.Group("Ticket" + conn.TicketId)
                .SendAsync("ReceiveMessage", conn.Name, message);
        }
        
        public async Task LeaveChat(UserConnection conn)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, "Ticket" + conn.TicketId);

            await Clients.Group("Ticket" + conn.TicketId).SendAsync("LeaveChat", $"{conn.Name} has left the Ticket{conn.TicketId} chat");
        }
    }   
}

