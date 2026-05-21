import { LocalTokenStorage } from '../storage/LocalTokenStorage';
import { LocalUserSessionStorage } from '../storage/LocalUserSessionStorage';
import { HttpAuthRepository } from '../repositories/HttpAuthRepository';
import { HttpTicketRepository } from '../repositories/HttpTicketRepository';
import { HttpAdminTicketRepository } from '../repositories/HttpAdminTicketRepository';

import { RegisterUser } from '@/application/usecases/auth/RegisterUser';
import { LoginUser } from '@/application/usecases/auth/LoginUser';
import { LogoutUser } from '@/application/usecases/auth/LogoutUser';
import { GetCurrentSession } from '@/application/usecases/auth/GetCurrentSession';
import { ListTickets } from '@/application/usecases/tickets/ListTickets';
import { GetTicketById } from '@/application/usecases/tickets/GetTicketById';
import { CreateTicket } from '@/application/usecases/tickets/CreateTicket';
import { UpdateTicket } from '@/application/usecases/tickets/UpdateTicket';
import { DeleteTicket } from '@/application/usecases/tickets/DeleteTicket';
import { ListAllTicketsAdmin } from '@/application/usecases/tickets/ListAllTicketsAdmin';

const tokenStorage = new LocalTokenStorage();
const userSessionStorage = new LocalUserSessionStorage();

const authRepo = new HttpAuthRepository();
const ticketRepo = new HttpTicketRepository();
const adminRepo = new HttpAdminTicketRepository();

export const useCases = {
  registerUser: new RegisterUser(authRepo),
  loginUser: new LoginUser(authRepo, tokenStorage, userSessionStorage),
  logoutUser: new LogoutUser(tokenStorage, userSessionStorage),
  getCurrentSession: new GetCurrentSession(tokenStorage, userSessionStorage),
  listTickets: new ListTickets(ticketRepo),
  getTicket: new GetTicketById(ticketRepo),
  createTicket: new CreateTicket(ticketRepo),
  updateTicket: new UpdateTicket(ticketRepo),
  deleteTicket: new DeleteTicket(ticketRepo),
  listAdminTickets: new ListAllTicketsAdmin(adminRepo),
};

// ── datos.gov.co integration ──────────────────────────────────────────────────
import { DatosGovLotteryResultRepository } from '../repositories/DatosGovLotteryResultRepository';
import { ListLatestLotteryResults } from '@/application/usecases/lottery/ListLatestLotteryResults';
import { CheckTicketAgainstResults } from '@/application/usecases/lottery/CheckTicketAgainstResults';

const lotteryRepo = new DatosGovLotteryResultRepository();

export const lotteryUseCases = {
  listLatestLotteryResults: new ListLatestLotteryResults(lotteryRepo),
  checkTicketAgainstResults: new CheckTicketAgainstResults(lotteryRepo),
};
