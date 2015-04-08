<?php

namespace Application\Sonata\ProductBundle\Provider;

use Sonata\AdminBundle\Form\FormMapper;
use Sonata\ProductBundle\Model\BaseProductProvider;

/**
 * @author Lander Vanderstraeten <lander_vanderstraeten@hotmail.com>
 */
class ProductProvider extends BaseProductProvider
{
    /**
     * {@inheritDoc}
     */
    public function getBaseControllerName()
    {
        return 'SonataProductBundle:Product';
    }

    public function buildEditForm(FormMapper $formMapper, $isVariation = false)
    {
        parent::buildEditForm($formMapper, $isVariation);

        $formMapper->with('Product')
            ->add(
                'brand',
                'text',
                array(
                    'translation_domain' => 'ApplicationSonataProductBundle',
                )
            )
            ->end();
    }
}
