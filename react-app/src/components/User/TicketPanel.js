import styled from 'styled-components';
import Ticket from '../Tickets/Ticket';

const TicketsDiv = styled.div`
width: 100%;
height: 180px;
margin: 10px 0;
`

const TicketUL = styled.ul`
width: 88vw;
height: 100.8333245%;
margin: 10px 0;
display: flex;
flex-direction: row;
flex-wrap: wrap;
overflow-x: scroll;
`

function TicketPanel({ tickets }) {

    return (
        <div className="tickets-panel">
            <TicketsDiv>
                {tickets ? (
                    <TicketUL>
                        {tickets.map((ticket) => {
                            return <Ticket key={ticket.id} ticket={ticket} />;
                        })}
                    </TicketUL>
                ) : (
                    <p>Loading</p>
                )}
            </TicketsDiv>
        </div>
    );
};

export default TicketPanel;
