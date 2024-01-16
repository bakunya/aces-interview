import { Hono } from 'hono';
import { Bindings } from '../binding';
import batchesListController from '../controllers/batches-list';
import batchesNewController from '../controllers/batches-new';
import batchesCreateController from '../controllers/batches-create';
import batchesCreateValidation from '../middleware/validation/batches.create';
import batchesScheduleController from '../controllers/batches-schedule';
import batchesGroupController from '../controllers/batches-group';
import batchesParticipantController from '../controllers/batches-participant';
import batchesAssessorController from '../controllers/batches-assessor';
import redirectMiddleware from '../middleware/redirect';
import batchesParticipantBulkDeleteController from '../controllers/batches-participant-bulk-delete';
import batchesParticipantBulkDeleteValidator from '../middleware/validation/batches.participant-bulk-delete';
import batchesAddParticipantsController from '../controllers/batches-add-participants';
import adminBatchesAddParticipantsPostController from '../controllers/batches-add-participants-post';
import organizationListController from '../controllers/organization-list';
import organizationNewController from '../controllers/organization-new';
import organizationCreateController from '../controllers/organization-create';

export default function webRoutes(app: Hono<{ Bindings: Bindings }>) {
	app.get("/", redirectMiddleware("/batches"))
	app.get("/batches", batchesListController)
	app.get("/batches/new/:org_id", batchesNewController)
	app.get("/batches/:id/group", batchesGroupController)
	app.get("/batches/:id/assessor", batchesAssessorController)
	app.get("/batches/:id/schedule", batchesScheduleController)
	app.get("/batches/:id/participant", batchesParticipantController)
	app.get('/batches/:id/add-participants', batchesAddParticipantsController);
	app.post("/batches/create", batchesCreateValidation, batchesCreateController)
	app.post('/batches/:id/add-participants', adminBatchesAddParticipantsPostController);
	app.post("/batches/:id/participant-bulk-delete", batchesParticipantBulkDeleteValidator, batchesParticipantBulkDeleteController)
	
	app.get("/organization", organizationListController)
	app.get("/organization/new", organizationNewController)
	app.post("/organization/create", organizationCreateController)
}
