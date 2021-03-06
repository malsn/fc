<?php
/*
 * This file is part of the Sonata package.
 *
 * (c) Thomas Rabaix <thomas.rabaix@sonata-project.org>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */


namespace Application\Sonata\DeliveryBundle\Model;

use Sonata\Component\Delivery\BaseServiceDelivery;


/**
 * Class TakeAwayDelivery
 *
 * Custom delivery class example
 *
 * @package Application\Sonata\DeliveryBundle\Model
 *
 * @author Hugo Briand <briand@ekino.com>
 */
class FreeCourierDelivery extends BaseServiceDelivery
{
    /**
     *@var bool
     */
    protected $enabled = true; //default is null (null = false)

    /**
     * {@inheritdoc}
     */
    public function isAddressRequired()
    {
        return true;
    }

    /**
     * {@inheritdoc}
     */
    public function getCode()
    {
        return 'free_courier';
    }

    public function getName()
    {
        return 'Бесплатная курьерская доставка';
    }
}