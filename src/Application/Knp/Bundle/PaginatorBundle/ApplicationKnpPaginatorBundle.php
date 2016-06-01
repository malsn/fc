<?php

/**
 * (c) Thibault Duplessis <thibault.duplessis@gmail.com>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace Application\Knp\Bundle\PaginatorBundle;

use Knp\Bundle\PaginatorBundle\DependencyInjection\Compiler\PaginatorAwarePass;
use Knp\Bundle\PaginatorBundle\DependencyInjection\Compiler\PaginatorConfigurationPass;
use Symfony\Component\HttpKernel\Bundle\Bundle;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Compiler\PassConfig;

class ApplicationKnpPaginatorBundle extends Bundle
{
    /**
     * {@inheritdoc}
     */
    public function getParent()
    {
        return 'KnpPaginatorBundle';
    }
}
