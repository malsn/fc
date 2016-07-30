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
    }
}