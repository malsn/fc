<?php

namespace Sonata\Bundle\DemoBundle\Payment;

use Sonata\Component\Basket\BasketInterface;
use Sonata\Component\Order\OrderInterface;
use Sonata\Component\Payment\BasePayment;
use Sonata\Component\Payment\TransactionInterface;
use Sonata\Component\Product\ProductInterface;

class Bitcoin extends BasePayment
{
    /**
     * {@inheritdoc}
     */
    public function getCode()
    {
        return 'bitcoin';
    }

    public function getName()
    {
        return 'Биткоин';
    }
}