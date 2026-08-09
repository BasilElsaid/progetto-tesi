# Platform Aziende – Job Matching SPA

## Overview

Web application sviluppata come caso di studio per l’analisi dell’architettura **Single Page Application (SPA)**.

La piattaforma consente alle aziende di pubblicare annunci di lavoro e agli studenti di consultarli in base ai permessi di accesso.

---

## Obiettivi del progetto

- Sviluppo di una SPA completa
- Comunicazione frontend/backend tramite API REST
- Autenticazione con JWT
- Autorizzazione basata su ruoli (RBAC)
- Gestione CRUD di utenti e annunci
- Persistenza dati su MongoDB

---

## Architettura

Sistema basato su architettura **client-server separata**.

### Frontend
- Angular 19
- Routing client-side
- Reactive Forms
- HTTP Client
- Route Guards per protezione accessi
- Tailwind CSS

### Backend
- NestJS
- REST API
- JWT Authentication
- Role-based Access Control (ADMIN, COMPANY, GUEST)
- Validazione DTO
- MongoDB con Mongoose

### Database
- MongoDB
- Collezioni principali:
  - Users
  - Jobs

---

## Ruoli del sistema

### Admin
- Gestione utenti e aziende
- Approvazione o rifiuto annunci
- Eliminazione annunci e aziende

### Azienda (Company)
- Gestione profilo aziendale
- Creazione e gestione annunci
- Visualizzazione stato annunci (PENDING / APPROVED)

### Utente (Guest/Student)
- Visualizzazione annunci approvati

---

## Avvio in locale (Docker)

### Requisiti
- Docker Desktop

### Avvio progetto

```bash
docker compose up --build