<?php

/**
 * 
 */

namespace Guest\Entity;

use Doctrine\ORM\Mapping as ORM;
use Zend\InputFilter\InputFilterAwareInterface;
use Zend\InputFilter\InputFilterInterface;

/**
 * @ORM\Entity
 * @ORM\Table(name="guest")
 */
class Guest implements InputFilterAwareInterface {

    /**
     * @ORM\Id @ORM\Column(type="integer")
     * @ORM\GeneratedValue
     */
    private $id;

    /** @ORM\Column(length=200) */
    private $name;

    /** @ORM\Column(length=200, nullable=true) */
    private $surname;
    
    /** @ORM\Column(length=6) */
    private $gender;
    
    /** @ORM\Column(length=200, nullable=true) */
    private $email;
    
    /**
     * @ORM\Column(length=50)
     * Who knows this person?
     */
    private $connection;
    
    /**
     * @ORM\OneToOne(targetEntity="Guest")
     * @var Guest
     */
    private $partner;
    /** @ORM\Column(type="boolean", nullable=true) */
    private $partnerAllowed;
    
    /** @ORM\Column(type="boolean", nullable=true) */
    private $inviteMorning;

    /** @ORM\Column(type="boolean", nullable=true) */
    private $inviteEvening;

    /** @ORM\Column(type="datetime", name="viewed_at", nullable=true) */
    private $viewedAt;

    /** @ORM\Column(type="boolean", nullable=true) */
    private $attendMorning;

    /** @ORM\Column(type="boolean", nullable=true) */
    private $attendEvening;

    /** @ORM\Column(type="datetime", name="replied_at", nullable=true) */
    private $repliedAt;

    /**
     * @param array $values
     */
    public function __construct(array $values) {
        $this->populate($values);
    }

    /**
     * @param array $values
     */
    public function populate(array $values = array()) {
        $keys = get_object_vars($this);
        unset($keys['id']);
        unset($keys['partner']);
        
        if (isset($values['viewedAt'])) {
            $this->setViewedAt( new \DateTime($values['viewedAt']) );
            unset($values['viewedAt']);
        }
        if (isset($values['repliedAt'])) {
            $this->repliedAt = new \DateTime($values['repliedAt']);
            unset($values['repliedAt']);
        }
        
        $this->setBoolean($values, 'attendMorning');
        unset($values['attendMorning']);
        $this->setBoolean($values, 'attendEvening');
        unset($values['attendEvening']);
        $this->setBoolean($values, 'inviteEvening');
        unset($values['inviteEvening']);
        $this->setBoolean($values, 'inviteMorning');
        unset($values['inviteMorning']);
        $this->setBoolean($values, 'partnerAllowed');
        unset($values['partnerAllowed']);
        
        foreach ($keys as $key => $v) {
            if (isset($values[$key]) && !is_null($values[$key])) {
                if ($values[$key] === null) {
                    continue;
                }
                $this->{$key} = $values[$key];
            }
        }
    }
    
    private function setBoolean($values, $key) {
        if (isset($values[$key]) && ($values[$key] === 'true' || $values[$key] === 'false')) {
            $this->{$key} = $values[$key] === 'true' ? true : false;
        }
    }
    
    /**
     * @return array
     */
    public function getArrayCopy() {
        $vars = get_object_vars($this);
        $vars['partner'] = isset($vars['partner']) ? $vars['partner']->getId() : null;
        $vars['viewedAt'] = isset($vars['viewedAt']) ? $vars['viewedAt']->format('Y/m/d') : null;
        $vars['repliedAt'] = isset($vars['repliedAt']) ? $vars['repliedAt']->format('Y/m/d') : null;
        
        unset($vars['__initializer__']);
        unset($vars['__cloner__']);
        unset($vars['__isInitialized__']);
        return $vars;
    }

    /**
     * @return array
     */
    public function toJson() {
        return \Zend\Json\Json::encode($this->getArrayCopy());
    }

    /**
     * @return integer
     */
    public function getId() {
        return $this->id;
    }

    /**
     * @return string
     */
    public function fullName() {
        return "{$this->name} {$this->surname}";
    }

    /**
     * @return string
     */
    public function getName() {
        return $this->name;
    }

    /**
     * @return string
     */
    public function getSurname() {
        return $this->surname;
    }

    public function getEmail() {
        return $this->email;
    }

    /**
     * @return string
     */
    public function getPartnerName() {
        return $this->partner->getName();
    }

    /**
     * @return Guest
     */
    public function getPartner() {
        return $this->partner;
    }
    
    public function getPartnerAllowed() {
        return $this->partnerAllowed;
    }

    public function getInviteMorning() {
        return $this->inviteMorning;
    }

    public function getInviteEvening() {
        return $this->inviteEvening;
    }

    public function getAttendMorning() {
        return $this->attendMorning;
    }

    public function getAttendEvening() {
        return $this->attendEvening;
    }

    /**
     * @return \DateTime
     */
    public function getViewedAt() {
        return $this->viewedAt;
    }

    /**
     * @return \DateTime
     */
    public function getRepliedAt() {
        return $this->repliedAt;
    }

    public function getGender() {
        return $this->gender;
    }

    public function getConnection() {
        return $this->connection;
    }

    public function setGender($gender) {
        $this->gender = $gender;
    }

    public function setConnection($connection) {
        $this->connection = $connection;
    }
    
    public function setName($name) {
        $this->name = $name;
    }

    public function setSurname($surname) {
        $this->surname = $surname;
    }

    public function setEmail($email) {
        $this->email = $email;
    }

    public function setPartner(Guest $partner = null) {
        $this->partner = $partner;
        if ($partner !== null && $partner->getPartner() !== $this) {
            $partner->setPartner($this);
        }
    }
    
    public function setPartnerAllowed($partnerAllowed) {
        $this->partnerAllowed = $partnerAllowed;
    }
    
    public function setViewedAt($viewedAt) {
        if ($this->viewedAt == null) {
            $this->viewedAt = $viewedAt;
        }
    }
    
    public function setInviteMorning($inviteMorning) {
        $this->inviteMorning = $inviteMorning;
    }

    public function setInviteEvening($inviteEvening) {
        $this->inviteEvening = $inviteEvening;
    }

    public function setAttendMorning($attendMorning) {
        $this->attendMorning = $attendMorning;
    }

    public function setAttendEvening($attendEvening) {
        $this->attendEvening = $attendEvening;
    }

    public function setRepliedAt($repliedAt) {
        $this->repliedAt = $repliedAt;
    }

    public function setInputFilter(InputFilterInterface $inputFilter) {
        throw new \Exception("Not used");
    }

    public function getInputFilter() {
        throw new \Exception("Not used");
    }
}
