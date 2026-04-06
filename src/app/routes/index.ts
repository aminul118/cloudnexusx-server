import { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/Auth.route';
import { UserRoutes } from '../modules/User/User.route';
import { ConversationRoutes } from '../modules/Conversation/Conversation.route';
import { PortfolioRoutes } from '../modules/Portfolio/Portfolio.route';
import { NotificationRoutes } from '../modules/Notification/Notification.route';
import { BlogRoutes } from '../modules/Blog/Blog.route';
import { ServiceRoutes } from '../modules/Service/Service.route';
import { ContactRoutes } from '../modules/Contact/Contact.route';
import { PartnerRoutes } from '../modules/Partner/Partner.route';
import { QuotationRoutes } from '../modules/Quotation/Quotation.route';
import { InvoiceRoutes } from '../modules/Invoice/Invoice.route';

const router = Router();

interface Routes {
  path: string;
  route: Router;
}

const moduleRoutes: Routes[] = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/portfolios',
    route: PortfolioRoutes,
  },
  {
    path: '/conversations',
    route: ConversationRoutes,
  },
  {
    path: '/notifications',
    route: NotificationRoutes,
  },
  {
    path: '/blogs',
    route: BlogRoutes,
  },
  {
    path: '/services',
    route: ServiceRoutes,
  },
  {
    path: '/contacts',
    route: ContactRoutes,
  },
  {
    path: '/partners',
    route: PartnerRoutes,
  },
  {
    path: '/quotations',
    route: QuotationRoutes,
  },
  {
    path: '/invoices',
    route: InvoiceRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
