import * as Joi from 'joi';

export const companyFormSchema = Joi.object({
  name: Joi.string().required().max(100).label('Company Name'),
  tagline: Joi.string().optional().max(150).label('Tagline'),
  url: Joi.string().uri({
    scheme: ['http', 'https'],
  }).label('Website'),
  description: Joi.string().required().max(1000).tags('wysiwyg').label('Description'),
  // @todo validate + upload logo img
  // logoSrc: Joi.string().optional(),
}).label('About the company');

export const jobFormSchema = Joi.object({
  title: Joi.string().required().max(150).label('Job Title'),
  location: Joi.string().required().max(200).label('Location'),
  fulltime: Joi.boolean().required().default(true).tags('radio').meta({
    labelTrue: 'Full time',
    labelFalse: 'Part time',
  }).label('Workload'),
  contract: Joi.boolean().required().default(false).tags('radio').meta({
    labelTrue: 'Contract/Freelance',
    labelFalse: 'Employment',
  }).label('Work Type'),
  reloc: Joi.boolean().optional().default(false).tags('cb').label('Relocation Assistance'),
  visa: Joi.boolean().optional().default(false).tags('cb').label('Visa Sponsorship'),
  description: Joi.string().required().max(1000).tags('wysiwyg').label('Job Description'),
  instructions: Joi.string().required().max(500).tags('textarea').label('Application Instructions'),
}).label('About the job');

export const userFormSchema = Joi.object({
  email: Joi.string().required().email().label('Email Address'),
  firstName: Joi.string().required().max(100).label('First Name'),
  lastName: Joi.string().required().max(100).label('Last Name'),
});

export const scheduleFormSchema = Joi.object({
  start:  Joi.date().required().min('now').default(Date.now, 'post live date').label('Post Date')
    .description('The post will go live on this day'),
  length: Joi.number().min(1).default(1).label('Running time').meta({
    optVal: {
      0: {label: '1 Month', value: 1},
      1: {label: '2 Months', value: 2},
      2: {label: '3 Months', value: 2},
    },
  }),
}).label('Schedule Posting');

export const paymentFormSchema = Joi.object({
  email: Joi.string().required().email().label('Receipt Email').meta({
    help: 'We\'ll send a receipt to this email address',
  }),
  stripeCard: Joi.bool().required().default(false).not(false).tags('stripe-card').label('Card'),
  stripeToken: Joi.string().required().tags('hidden'),
  customerId: Joi.string().required().tags('hidden'),
  cartId: Joi.string().required().tags('hidden'),
}).label('Payment');

export default {
  job: jobFormSchema,
  company: companyFormSchema,
  schedule: scheduleFormSchema,
  payment: paymentFormSchema,
};
