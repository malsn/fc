<?php
/**
 * This file is part of the <name> project.
 *
 * (c) <yourname> <youremail>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Application\Sonata\CustomerBundle;

use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\HttpKernel\Bundle\Bundle;
use Application\Sonata\CustomerBundle\DependencyInjection\Compiler\OverrideServiceCompilerPass;


/**
 * This file has been generated by the EasyExtends bundle ( http://sonata-project.org/easy-extends )
 *
 * References :
 *   bundles : http://symfony.com/doc/current/book/bundles.html
 *
 * @author <yourname> <youremail>
 */
class ApplicationSonataCustomerBundle extends Bundle
{
    public function build(ContainerBuilder $container)
    {
        parent::build($container);

        $container->addCompilerPass(new OverrideServiceCompilerPass());
    }
    /**
     * {@inheritdoc}
     */
    public function getParent()
    {
        return 'SonataCustomerBundle';
    }
}