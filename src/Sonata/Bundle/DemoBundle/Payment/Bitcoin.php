<?php

namespace Sonata\Bundle\DemoBundle\Payment;

use Sonata\Component\Payment\BasePayment;

class Bitcoin extends BasePayment
{
    /**
     * {@inheritdoc}
     */
    public function getCode()
    {
        return 'bitcoin';
    }

}