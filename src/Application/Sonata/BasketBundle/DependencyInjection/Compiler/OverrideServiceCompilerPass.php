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

        $definition_basket_controller = $container->getDefinition('sonata.basket.controller.api.basket');
        $definition_basket_controller->setClass('Application\Sonata\BasketBundle\Controller\Api\BasketController');

        $definition_basket_loader = $container->getDefinition('sonata.basket.loader.standard');
        $definition_basket_loader->setClass('Application\Sonata\Component\Basket\Loader');

        $definition_basket_manager = $container->getDefinition('sonata.basket.manager');
        $definition_basket_manager->setClass('Application\Sonata\Component\Basket\BasketManager');

        $definition_basket_factory = $container->getDefinition('sonata.basket.factory');
        $definition_basket_factory->setClass('Application\Sonata\Component\Basket\BaseBasketFactory');

        $definition_basket_entity_factory = $container->getDefinition('sonata.basket.entity.factory');
        $definition_basket_entity_factory->setClass('Application\Sonata\Component\Basket\BasketEntityFactory');

        $definition_basket_session_factory = $container->getDefinition('sonata.basket.session.factory');
        $definition_basket_session_factory->setClass('Application\Sonata\Component\Basket\BasketSessionFactory');


    }
}