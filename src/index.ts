import * as Joi from 'joi';

export const companyFormSchema = Joi.object({
  name: Joi.string().required().max(100).label('Company Name'),
  description: Joi.string().required().max(1000).tags('wysiwyg').label('description'),
  tagline: Joi.string().optional().max(150).label('Tagline'),
  url: Joi.string().uri({
    scheme: ['http', 'https'],
  }).label('Website'),
  // @todo validate + upload logo img
  // logoSrc: Joi.string().optional(),
});

export const jobFormSchema = Joi.object({
  title: Joi.string().required().max(150).label('Job Title'),
  description: Joi.string().required().max(1000).tags('wysiwyg').label('Descrpition'),
  instructions: Joi.string().required().max(500).tags('textarea').label('Application Instructions'),
  location: Joi.string().required().max(200).label('Location'),
  fulltime: Joi.boolean().required().tags('radio').meta({
    label: {
      0: 'Part time',
      1: 'Full time',
    },
  }).label('Job Length'),
  contract: Joi.boolean().required().tags('radio').meta({
    label: {
      0: 'Employment',
      1: 'Contract',
    },
  }).label('Work Type'),
  reloc: Joi.boolean().optional().default(false).tags('cb').label('Relocation Assistance'),
  visa: Joi.boolean().optional().default(false).tags('cb').label('Visa Sponsorship'),
});

export const userFormSchema = Joi.object({
  email: Joi.string().required().email().label('Email Address'),
  firstName: Joi.string().required().max(100).label('First Name'),
  lastName: Joi.string().required().max(100).label('Last Name'),
});
