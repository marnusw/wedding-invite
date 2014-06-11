<?php
/**
 * 
 */

namespace Guest\Form;

use Zend\Form\Element;
use Zend\Form\Form;

class CsvForm extends Form
{
    public function __construct($name = null, $options = array()) {
        parent::__construct($name, $options);
        $this->addElements();
    }
    
    public function addElements() {
        // File Input
        $file = new Element\File('csv-file');
        $file->setLabel('Guest list Upload')
             ->setAttribute('id', 'csv-file');
        $this->add($file);
    }
}
