<?php

namespace Application\Sonata\Component\Basket;

interface BasketBuilderInterface
{
    /**
     * Build a basket
     *
     * @param \Application\Sonata\BasketBundle\Entity\Basket $basket
     */
    public function build(Basket $basket);
}
