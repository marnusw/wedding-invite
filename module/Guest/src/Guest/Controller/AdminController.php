<?php
/**
 * 
 */

namespace Guest\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;

use Guest\Form\CsvForm;
use Guest\Entity\Guest;

class AdminController extends AbstractActionController
{
    /**
     * @var Doctrine\ORM\EntityManager
     */
    protected $em;
    
    public function indexAction()
    {
        return new ViewModel();
    }
    
    public function uploadCsvAction()
    {
        $form = new CsvForm('upload-form');

        $request = $this->getRequest();
        if ($request->isPost()) {
            // Make certain to merge the files info!
            $post = array_merge_recursive(
                $request->getPost()->toArray(),
                $request->getFiles()->toArray()
            );

            $form->setData($post);
            if ($form->isValid()) {
                $data = $form->getData();
                $csv = $this->csvImport($data['csv-file']['tmp_name']);
                $this->saveGuests($csv);
                return $this->redirect()->toRoute('/admin');
            }
        }

        return array('form' => $form);
    }
    
    private function saveGuests($guestsData) {
        $em = $this->getEntityManager();
        
        foreach ($guestsData as $data) {
            $g1 = $g2 = null;
            if (!empty($data['name'])) {
                $g1 = $this->newGuest($data['name'], 'male', $data);
                $em->persist($g1);
            }
            if (!empty($data['partnerName'])) {
                $g2 = $this->newGuest($data['partnerName'], 'female', $data);
                $em->persist($g2);
            }
            if ($g1 && $g2) {
                $g1->setPartner($g2);
                $g2->setPartner($g1);
            }
        }
        $em->flush();
    }
    
    private function newGuest($name, $gender, $options) {
        if (!isset($options['inviteMorning']) || $options['inviteMorning'] != 'FALSE') {
            $options['inviteMorning'] = false;
        } else {
            $options['inviteMorning'] = true;
        }
        if (!isset($options['inviteEvening']) || $options['inviteMorning'] != 'FALSE') {
            $options['inviteEvening'] = false;
        } else {
            $options['inviteEvening'] = true;
        }
        $guest = new Guest($options);
        $guest->setGender($gender);
        $guest->setName($name);
        return $guest;
    }
    
    private function getEntityManager() {
        if (null === $this->em) {
            $this->em = $this->getServiceLocator()->get('doctrine.entitymanager.orm_default');
        }
        return $this->em;
    }
}