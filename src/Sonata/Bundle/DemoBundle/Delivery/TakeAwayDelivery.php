<?php

namespace Sonata\Bundle\DemoBundle\Delivery;

use Sonata\Component\Delivery\BaseServiceDelivery;


/**
 * Class TakeAwayDelivery
 */
class TakeAwayDelivery extends BaseServiceDelivery
{
    /**
     * {@inheritdoc}
     */
    public function isAddressRequired()
    {
        return false;
    }

    /**
     * {@inheritdoc}
     */
    public function getCode()
    {
        return 'takeaway';
    }
}