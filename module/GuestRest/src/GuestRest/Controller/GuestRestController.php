<?php

/**
 * 
 */

namespace GuestRest\Controller;

use Zend\Mvc\Controller\AbstractRestfulController;
use Doctrine\ORM\EntityManager;

use Guest\Entity\Guest;

class GuestRestController extends AbstractRestfulController
{
    /**
     * @var EntityManager
     */
    protected $em;

    public function get($id) {
        /* @var $guest Guest */
        $guest = $this->getEntityManager()->find('Guest\Entity\Guest', $id);

        $response = $this->getResponseWithHeader();
        if ($guest) {
            $response->setContent($guest->toJson());
        } else {
            $response->setContent("Error: guest {$id} not found");
        }
        return $response;
    }

    public function getList() {
        $guests = $this->getEntityManager()->getRepository('Guest\Entity\Guest')->findAll();
        $gData = array();
        foreach ($guests as $guest) {
            $gData[] = $guest->getArrayCopy();
        }
        $response = $this->getResponseWithHeader()
                         ->setContent(\Zend\Json\Json::encode($gData));
        return $response;
    }

    public function create($data) {
        $em = $this->getEntityManager();
        $guest = new Guest($data);
        $em->persist($guest);
        
        if (isset($data['partner'])) {
            $partner = new Guest($data['partner']);
            $em->persist($partner);
            $guest->setPartner($partner);
        }

        $em->flush();
        $response = $this->getResponseWithHeader()
                         ->setContent($guest->toJson());
        return $response;
    }

    public function update($id, $data) {
        $em = $this->getEntityManager();
        /* @var $guest Guest */
        $guest = $em->find('Guest\Entity\Guest', $id);

        $response = $this->getResponseWithHeader();
        if ($guest) {
            $guest->populate($data);
            
            if (isset($data['partner']) && is_array($data['partner']) && !isset($data['partner']['id'])) {
                $data['partner']['gender'] = $guest->getGender() == 'male' ? 'female' : 'male';
                $partner = new Guest($data['partner']);
                $em->persist($partner);
                $guest->setPartner($partner);
            }
            
            $em->flush();
            $response->setContent($guest->toJson());
        } else {
            $response->setContent("Error: guest {$id} not found");
        }
        return $response;
    }
    
    /**
     * Delete an existing resource
     *
     * @param  mixed $id
     * @return mixed
     */
    public function delete($id)
    {
        $em = $this->getEntityManager();
        $guest = $this->getEntityManager()->find('Guest\Entity\Guest', $id);
        $partner = $guest->getPartner();
        if ($partner) {
            $guest->setPartner(null);
            $partner->setPartner(null);
        }
        $em->remove($guest);
        $em->flush();
        
        return $this->getResponseWithHeader();
    }

    private function getResponseWithHeader() {
        $response = $this->getResponse();
        $response->getHeaders()
                //make can accessed by *   
                ->addHeaderLine('Access-Control-Allow-Origin', '*')
                //set allow methods
                ->addHeaderLine('Access-Control-Allow-Methods', 'POST PUT GET');
        return $response;
    }

    private function getEntityManager() {
        if (null === $this->em) {
            $this->em = $this->getServiceLocator()->get('doctrine.entitymanager.orm_default');
        }
        return $this->em;
    }
}
