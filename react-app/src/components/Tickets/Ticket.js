import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { acquireEvents } from "../../store/events";
import styled from 'styled-components'
import { QRCodeSVG } from 'qrcode.react';
import { Modal } from "../Global/Elements/Modal";
import TicketForm from "./TicketForm";

import ticketBG from '../../images/stock-ticket.jpg'

const OuterDiv = styled.div`
position: absolute;
width: 220px;
`

const TicketRectangle = styled.div`
display: flex;
flex-direction: row;
height: 100px;
width: 260px;
align-items: center;
`

const TicketBGImage = styled.img`
position: absolute;
height: 150px;
width: 320px;
z-index: -1;
margin: 0px;
`

const TicketInfo = styled.div`
margin: 8px 0 0 60px;
width: 110px;
`

const TicketEventName = styled.p`
margin: 0 0 0 12px;
height: 80px;
width: 120px;
font-size: 14px;
cursor: pointer;
`

const AttendeeName = styled.p`
margin: 0 0 0 12px;
font-size: 14px;
text-overflow: ellipsis;
`

const QRdiv = styled.div`
margin: 32px 0 0 10px;
`

function Ticket({ ticket }) {
    const dispatch = useDispatch()
    const [showTicket, setShowTicket] = useState(false)
    const event = useSelector(state => state.events[ticket.event_id])

    useEffect(() => {
        dispatch(acquireEvents())
    }, [dispatch])

    return (
        <OuterDiv>
            {event && ticket &&
                <TicketRectangle>
                    <TicketBGImage src={ticketBG} alt='stock-ticket-image' />
                    <TicketInfo>
                    <TicketEventName onClick={() => setShowTicket(true)} >{event.name}</TicketEventName>
                    <AttendeeName>{ticket.attendee}</AttendeeName>
                    </TicketInfo>
                    <QRdiv>
                        <QRCodeSVG value={ticket.event_url} size='64' />
                    </QRdiv>
                </TicketRectangle>
            }
            {showTicket &&
                <Modal onClose={() => setShowTicket(false)}>
                    <TicketForm event={event} ticket={ticket} setShowTicket={setShowTicket} />
                </Modal>
            }
        </OuterDiv>
    );
};

export default Ticket;
