<?php
namespace Application\Sonata\BasketBundle\DependencyInjection\Compiler;

use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;
use Symfony\Component\DependencyInjection\ContainerBuilder;

class OverrideServiceCompilerPass implements CompilerPassInterface
{
    public function process(ContainerBuilder $container)
    {
        $definition = $container->getDefinition('sonata.basket.builder.standard');
        $definition->setClass('Application\Sonata\Component\Basket\BasketBuilder');

        $definition_basket = $container->getDefinition('sonata.basket');
        $definition_basket->setClass('Application\Sonata\Component\Basket\Basket');

        $definition_basket_entity_factory = $container->getDefinition('sonata.basket.entity.factory');
        $definition_basket_entity_factory->setClass('Application\Sonata\Component\Basket\BasketEntityFactory');

        $definition_basket_controller = $container->getDefinition('sonata.basket.controller.api.basket');
        $definition_basket_controller->setClass('Application\Sonata\BasketBundle\Controller\Api\BasketController');
    }
}