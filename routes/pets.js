const { Router } = require('express');
const router = Router();

const PetController = require('../controllers/PetController');

router.get('/', PetController.showGrid);
router.get('/adocao', PetController.showGridAdocao);
router.get('/cadastrar', PetController.showPetCadastro);
router.post('/cadastrar', PetController.store);
router.get('/adocao/cadastrar', PetController.showPetCadastroAdocao);
router.post('/adocao/cadastrar', PetController.store);
router.get('/:id/editar', PetController.showPetEdicao);
router.put('/:id/editar', PetController.update)
router.get('/adocao/:id/editar', PetController.showPetEdicaoAdocao);
router.put('/adocao/:id/editar', PetController.update);
router.get('/:id', PetController.showPetPerfil);
router.delete('/:id', PetController.delete);

module.exports = router;