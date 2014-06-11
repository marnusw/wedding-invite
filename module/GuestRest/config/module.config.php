<?php
namespace GuestRest;

return array(
    'router' => array(
        'routes' => array(
            'guest-rest' => array(
                'type'    => 'segment',
                'options' => array(
                    'route'    => '/guest-rest[/:id]',
                    'constraints' => array(
                        'id' => '[0-9]+',
                    ),
                    'defaults' => array(
                        'controller' => 'GuestRest\Controller\GuestRest',
                    ),
                ),
            ),
        ),
    ),
    
    'controllers' => array(
        'factories' => array(
            'mycontroller' => 'My\Namespace\MyControllerFactory'
        ),
        'invokables' => array(
            'GuestRest\Controller\GuestRest' => 'GuestRest\Controller\GuestRestController',
        ),
    ),
    
    'view_manager' => array(
        'strategies' => array(
            'ViewJsonStrategy',
        ),
    ),
    
    'doctrine' => array(
        'driver' => array(
            __NAMESPACE__ . '_driver' => array(
                'class' => 'Doctrine\ORM\Mapping\Driver\AnnotationDriver',
                'cache' => 'array',
                'paths' => array(
                    __DIR__ . '/../src/' . __NAMESPACE__ . '/Entity',
                    __DIR__ . '/../../Guest/src/Guest/Entity',
                )
            ),
            'orm_default' => array(
                'drivers' => array(
                    __NAMESPACE__ . '\Entity' => __NAMESPACE__ . '_driver',
                    'Guest\Entity' => __NAMESPACE__ . '_driver'
                )
            )
        )
    ),
);