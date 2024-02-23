using Microsoft.AspNetCore.SignalR;
using techconnect.Models;

namespace techconnect.Hubs
{
    public class ChatHub : Hub
    {
        public async Task JoinChatRoom(UserConnection conn)
        {
            await Groups
                .AddToGroupAsync(Context.ConnectionId, "Ticket" + conn.TicketId);
            await Clients.Group("Ticket" + conn.TicketId)
                .SendAsync("JoinChatRoom", $"{conn.Name} has joined {"Ticket" + conn.TicketId}");
        }
        public async Task SendMessage(UserConnection conn, string message)
        {
            await Clients.Group("Ticket" + conn.TicketId)
                .SendAsync("ReceiveMessage", conn.Name, message);
        }
    }
}

