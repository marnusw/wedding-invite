<?php

/**
 * 
 */

namespace Guest\Entity;

use Doctrine\ORM\Mapping as ORM;
use Zend\InputFilter\InputFilterAwareInterface;
use Zend\InputFilter\InputFilterInterface;

/** @ORM\Entity */
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
    
    /** @ORM\Column(type="boolean") */
    private $inviteMorning;

    /** @ORM\Column(type="boolean") */
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

        foreach ($keys as $key => $v) {
            if (isset($values[$key]) && !is_null($values[$key])) {
                $this->{$key} = $values[$key];
            }
        }
    }

    /**
     * @return array
     */
    public function getArrayCopy() {
        $vars = get_object_vars($this);
        $vars['partner'] = $vars['partner']->getId();
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

    public function setPartner(Guest $partner) {
        $this->partner = $partner;
    }

    public function setViewedAt($viewedAt) {
        $this->viewedAt = $viewedAt;
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
